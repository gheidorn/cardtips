#    This work is licensed under the Creative Commons Attribution 3.0 Unported License.
#    To view a copy of this license, visit http://creativecommons.org/licenses/by/3.0/ or 
#    send a letter to Creative Commons, 171 Second Street, Suite 300, San Francisco, 
#    California, 94105, USA.
#    
#    $Id$
from google.appengine.ext import db

class Card(db.Model):
  multiverseId = db.IntegerProperty()
  name = db.StringProperty()
  set = db.StringProperty()