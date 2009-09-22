#    This work is licensed under the Creative Commons Attribution 3.0 Unported License.
#    To view a copy of this license, visit http://creativecommons.org/licenses/by/3.0/ or 
#    send a letter to Creative Commons, 171 Second Street, Suite 300, San Francisco, 
#    California, 94105, USA.
#    
#    $Id$
import datetime
from google.appengine.ext import db
from google.appengine.tools import bulkloader
import sys

import models

class CardLoader(bulkloader.Loader):
  def __init__(self):
    bulkloader.Loader.__init__(self, 'Card',
                               [('multiverseId', int),
                                ('set', str),
                                ('name', str)
                               ])

loaders = [CardLoader]