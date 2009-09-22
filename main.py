#    This work is licensed under the Creative Commons Attribution 3.0 Unported License.
#    To view a copy of this license, visit http://creativecommons.org/licenses/by/3.0/ or 
#    send a letter to Creative Commons, 171 Second Street, Suite 300, San Francisco, 
#    California, 94105, USA.
#    
#    main.py contains the request handlers for the site
#    
#    $Id$
import os
import logging
import wsgiref.handlers
import xml.dom.minidom

from datetime import date
from datetime import datetime
from datetime import timedelta

from django.utils import simplejson

from google.appengine.api import users
from google.appengine.ext import db
from google.appengine.ext import webapp
from google.appengine.ext.webapp import template


# Set to true if we want to have our webapp print stack traces, etc
_DEBUG = True

class Card(db.Model):
  multiverseId = db.IntegerProperty()
  name = db.StringProperty()
  set = db.StringProperty()

class BaseRequestHandler(webapp.RequestHandler):
  """Supplies a common template generation function """
  def generate(self, template_name, template_values={}):
    values = {    }
    values.update(template_values)
    directory = os.path.dirname(__file__)
    path = os.path.join(directory, os.path.join('html', template_name))
    self.response.out.write(template.render(path, values, debug=_DEBUG))

class HomePage(BaseRequestHandler):
  def get(self):
    template = "home.html"
    template_values = {  }
    self.generate(template, template_values)

class ExamplesPage(BaseRequestHandler):
  def get(self):
    template = "examples.html"
    template_values = {  }
    self.generate(template, template_values)

class CardtipHandler(BaseRequestHandler):
  def get(self):
    n = self.request.get('n')
    logging.debug(n)
    results = Card.gql("WHERE name = :1", n)
    js = ""
    for card in results:
      js = "$Cardtips.registerCard({\"id\":\"" + str(card.multiverseId) + "\", \"set\":\"" + card.set + "\", \"name\":\""+card.name +"\"});"
    logging.info(js)
    self.response.headers['Content-Type'] = 'text/javascript'
    #self.response.headers['Expires'] = 'Thu, 27 Aug 2009 21:59:07 GMT'
    #self.response.headers['Cache-Control'] = "max-age=600"
    self.response.out.write(js)

class CardtipJSONHandler(BaseRequestHandler):
  def get(self):
    n = self.request.get('n')
    logging.debug(n)
    results = Card.gql("WHERE name = :1", n)
    jsonData = {}
    for card in results:
      jsonData.update({"id" : card.multiverseId, "set" : card.set, "name" : card.name})
    logging.debug(jsonData)
    self.response.headers['Content-Type'] = 'application/json'
    #self.response.headers['Expires'] = 'Thu, 27 Aug 2009 21:59:07 GMT'
    #self.response.headers['Cache-Control'] = "max-age=600"
    self.response.out.write(simplejson.dumps(jsonData))

def main():
  application = webapp.WSGIApplication([('/', HomePage),
                                        ('/cardtip', CardtipHandler),
                                        ('/examples', ExamplesPage)], debug=_DEBUG)
  wsgiref.handlers.CGIHandler().run(application)

if __name__ == '__main__':
  main()