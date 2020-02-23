import os
import json
import boto3
from time import time
from random import random
from decimal import Decimal

def get_uid():
    # TODO: real uid
    return str(int(random()*1000) + 10)

def get_database_table_handle():
    dynamodb = boto3.resource('dynamodb')
    return dynamodb.Table(os.environ['TABLE_NAME'])

def put_message(**kwargs):
    payload = {
        'latitude': Decimal(str(kwargs['latitude'] if 'latitude' in kwargs else 0.0)),
        'longitude': Decimal(str(kwargs['longitude'] if 'longitude' in kwargs else 0.0)),
        'timestamp': int(time()),
        'message': str(kwargs['message']) if 'message' in kwargs else 'messsage Uh oh!',
        'id': get_uid(),
        'from': str(kwargs['from']) if 'from' in kwargs else 'Team 12',
        'to': str(kwargs['to']) if 'to' in kwargs else 'AWS Hackers'
    }
    print(payload)
    table = get_database_table_handle()
    table.put_item(Item=payload)
    return payload

def handler(event, context):
    # Log the event argument for debugging and for use in local development.
    print(json.dumps(event))
    clean_event = event
    if 'body' in event:
        # clean_event = event['body']
        clean_event = json.loads(event['body'])

    payload = put_message(**clean_event)

    return_payload = {}
    for k,v in payload.items():
        return_payload[k] = str(v)

    return_val = {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'
        },
        'body': json.dumps(return_payload)
    }


    return return_val
