import requests
import json
import csv

def get_districts(state,house):
	return requests.get('http://openstates.org/api/v1/districts/%s/%s/?apikey=072b29bd58654fc2b44685779cb71e3c' % (state, house)).json()

def get_shape(leg_id):
	return requests.get('http://openstates.org/api/v1/districts/boundary/%s/?apikey=072b29bd58654fc2b44685779cb71e3c' % leg_id).content

#assembly_districts = get_districts('ca','upper')

"""for district in assembly_districts:
	outfile = open('public/data/assembly/%s.json' % district['id'],'w')
	shape = get_shape(district['boundary_id'])
	outfile.write(shape)"""

"""assembly_short = open('public/data/ca_assembly_short.json')
assembly_long = open('public/data/ca_assembly_full')

assembly_short_json = json.loads(assembly_short.read())
assembly_long_json = json.loads(assembly_long.read())

for i, item in enumerate(assembly_long_json['features']):
	assembly_short_json['features'][i]['properties']['name'] = item['properties']['NAMELSAD']
	assembly_short_json['features'][i]['properties']['district'] = int(item['properties']['SLDLST'])

for item in assembly_short_json['features']:
	print item['properties']['name']

assembly_short.close()
assembly_long.close()

outfile = open('public/data/ca_assembly_parsed.json','w')
outfile.write(json.dumps(assembly_short_json))
outfile.close"""

csvfile = open('public/data/assemblyfileready.csv')
outjson = []
outfile = open('public/data/ca/data-l.json','w')
csvwriter = csv.DictReader(csvfile)

for row in csvwriter:
	outjson.append( row )

outfile.write( json.dumps(outjson, encoding="iso-8859-1") )

outfile.close()
csvfile.close()