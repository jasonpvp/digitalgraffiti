import os
import json
import boto3
from copy import copy
from decimal import Decimal
from boto3.dynamodb.conditions import Key, Attr

class C(object):
    ### Config area ###
    # database_region = 'us-west-1'
    # database_url = ''
    database_table = os.environ['TABLE_NAME']

    ### CONSTANT VALUES ###
    REGION_OF_INTREST_DIAMETER = 0.0003
    REGION_OF_INTREST_RADIUS = 0.0003 / 2.0

    KEYWORD_MESSAGES = 'messages'
    KEYWORD_MESSAGE = 'message'
    KEYWORD_LATITUDE = 'latitude'
    KEYWORD_LONGITUDE = 'longitude'
    KEYWORD_TIMESTAMP = 'timestamp'
    KEYWORD_FROM = 'from'
    KEYWORD_TO = 'to'

    DB_KEYWORD_ITEMS = 'Items'

def fetch_geographic_messages(latitude, longitude):
    region_of_interest_latitude, region_of_interest_longitude = get_area_of_geographic_intrest(latitude, longitude)
    table = get_database_table_handle()
    # query logic:
    # (latitude <= region_of_interest_latitude[0] and latitude >= region_of_interest_latitude[1]) and
    # (longitude <= region_of_interest_longitude[0] and longitude >= region_of_interest_longitude[1])
    fe = Key('latitude').between(*region_of_interest_latitude) & Key('longitude').between(*region_of_interest_longitude)
    response = table.scan(FilterExpression=fe)
    # response_string = json.dumps(response, indent=2)
    print(response)
    return response

def get_database_table_handle():
    dynamodb = boto3.resource('dynamodb')
    return dynamodb.Table(C.database_table)

def get_area_of_geographic_intrest(latitude, longitude):
    # TODO: There's got to be a more graceful way of doing the same logic
    latitude_max = latitude + C.REGION_OF_INTREST_RADIUS
    latitude_min = latitude - C.REGION_OF_INTREST_RADIUS

    longitude_max = longitude + C.REGION_OF_INTREST_RADIUS
    longitude_min = longitude - C.REGION_OF_INTREST_RADIUS

    return ((
                Decimal(str(latitude_min)),
                Decimal(str(latitude_max))

            ),
            (
                Decimal(str(longitude_min)),
                Decimal(str(longitude_max))
            ))

def handler(event, context):
    # Log the event argument for debugging and for use in local development.
    # print(json.dumps(event))
    print(event)
    clean_event = event
    if 'body' in event:
        # clean_event = event['body']
        clean_event = json.loads(event['body'])
    print('LOOK HERE ALASTAIR:', clean_event)
    response = fetch_geographic_messages(clean_event[C.KEYWORD_LATITUDE], clean_event[C.KEYWORD_LONGITUDE])


    ########## RESPONSE_FORMAT
    # {
    # 	messages: [
    # 		{
    # 			latitude: Number,
    # 			longitude: Number,
    # 			message: String
    # 		}
    # 	]
    # }

   #  {'Items': [{'from': 'DigitalGraffiti', 'longitude': Decimal('-122.6793312'), 'timestamp': Decimal('1582398872064'),
   #  'message': 'Look out the south window on a summer evening. The sunset is beautiful. 🌇', 'id': '2',
   #  'to': 'AWS Elemental', 'latitude': Decimal('45.5163521')},
   # {'from': 'DigitalGraffiti', 'longitude': Decimal('-122.6793312'), 'timestamp': Decimal('1582398362797'),
   #  'message': 'I am glad you made it here today! 😃', 'id': '1', 'to': 'AWS Elemental',
   #  'latitude': Decimal('45.5163521')}]

    messages = []
    ui_response = {}
    for message in response[C.DB_KEYWORD_ITEMS]:
        for k,v in message.items():
            ui_response[k] = str(v)
        messages.append(ui_response)

    return_val = {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({C.KEYWORD_MESSAGES: messages})
    }
    return return_val