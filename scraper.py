import requests
import json

def get_districts(state,house):
	return requests.get('http://openstates.org/api/v1/districts/%s/%s/?apikey=072b29bd58654fc2b44685779cb71e3c' % (state, house)).json()

def get_shape(leg_id):
	return requests.get('http://openstates.org/api/v1/districts/boundary/%s/?apikey=072b29bd58654fc2b44685779cb71e3c' % leg_id).content

#assembly_districts = get_districts('ca','upper')

"""for district in assembly_districts:
	outfile = open('public/data/assembly/%s.json' % district['id'],'w')
	shape = get_shape(district['boundary_id'])
	outfile.write(shape)"""

senate_short = open('public/data/ca_senate_short.json')
senate_long = open('public/data/ca_senate_full')

senate_short_json = json.loads(senate_short.read())
senate_long_json = json.loads(senate_long.read())

for i, item in enumerate(senate_long_json['features']):
	senate_short_json['features'][i]['properties']['name'] = item['properties']['NAMELSAD']

for item in senate_short_json['features']:
	print item['properties']['name']

senate_short.close()
senate_long.close()

outfile = open('public/data/ca_senate_parsed.json','w')
outfile.write(json.dumps(senate_short_json))
outfile.close