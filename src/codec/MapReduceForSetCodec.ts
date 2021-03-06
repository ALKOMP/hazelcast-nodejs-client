/* tslint:disable */
import ClientMessage = require('../ClientMessage');
import {BitsUtil} from '../BitsUtil';
import Address = require('../Address');
import {AddressCodec} from './AddressCodec';
import {UUIDCodec} from './UUIDCodec';
import {MemberCodec} from './MemberCodec';
import {Data} from '../serialization/Data';
import {EntryViewCodec} from './EntryViewCodec';
import DistributedObjectInfoCodec = require('./DistributedObjectInfoCodec');
import {MapReduceMessageType} from './MapReduceMessageType';

var REQUEST_TYPE = MapReduceMessageType.MAPREDUCE_FORSET;
var RESPONSE_TYPE = 117;
var RETRYABLE = false;


export class MapReduceForSetCodec {


    static calculateSize(name: string, jobId: string, predicate: Data, mapper: Data, combinerFactory: Data, reducerFactory: Data, setName: string, chunkSize: number, keys: any, topologyChangedStrategy: string) {
// Calculates the request payload size
        var dataSize: number = 0;
        dataSize += BitsUtil.calculateSizeString(name);
        dataSize += BitsUtil.calculateSizeString(jobId);
        dataSize += BitsUtil.BOOLEAN_SIZE_IN_BYTES;
        if (predicate !== null) {
            dataSize += BitsUtil.calculateSizeData(predicate);
        }
        dataSize += BitsUtil.calculateSizeData(mapper);
        dataSize += BitsUtil.BOOLEAN_SIZE_IN_BYTES;
        if (combinerFactory !== null) {
            dataSize += BitsUtil.calculateSizeData(combinerFactory);
        }
        dataSize += BitsUtil.BOOLEAN_SIZE_IN_BYTES;
        if (reducerFactory !== null) {
            dataSize += BitsUtil.calculateSizeData(reducerFactory);
        }
        dataSize += BitsUtil.calculateSizeString(setName);
        dataSize += BitsUtil.INT_SIZE_IN_BYTES;
        dataSize += BitsUtil.BOOLEAN_SIZE_IN_BYTES;
        if (keys !== null) {
            dataSize += BitsUtil.INT_SIZE_IN_BYTES;

            keys.forEach((keysItem: any) => {
                dataSize += BitsUtil.calculateSizeData(keysItem);
            });
        }
        dataSize += BitsUtil.BOOLEAN_SIZE_IN_BYTES;
        if (topologyChangedStrategy !== null) {
            dataSize += BitsUtil.calculateSizeString(topologyChangedStrategy);
        }
        return dataSize;
    }

    static encodeRequest(name: string, jobId: string, predicate: Data, mapper: Data, combinerFactory: Data, reducerFactory: Data, setName: string, chunkSize: number, keys: any, topologyChangedStrategy: string) {
// Encode request into clientMessage
        var clientMessage = ClientMessage.newClientMessage(this.calculateSize(name, jobId, predicate, mapper, combinerFactory, reducerFactory, setName, chunkSize, keys, topologyChangedStrategy));
        clientMessage.setMessageType(REQUEST_TYPE);
        clientMessage.setRetryable(RETRYABLE);
        clientMessage.appendString(name);
        clientMessage.appendString(jobId);
        clientMessage.appendBoolean(predicate === null);
        if (predicate !== null) {
            clientMessage.appendData(predicate);
        }
        clientMessage.appendData(mapper);
        clientMessage.appendBoolean(combinerFactory === null);
        if (combinerFactory !== null) {
            clientMessage.appendData(combinerFactory);
        }
        clientMessage.appendBoolean(reducerFactory === null);
        if (reducerFactory !== null) {
            clientMessage.appendData(reducerFactory);
        }
        clientMessage.appendString(setName);
        clientMessage.appendInt32(chunkSize);
        clientMessage.appendBoolean(keys === null);
        if (keys !== null) {
            clientMessage.appendInt32(keys.length);

            keys.forEach((keysItem: any) => {
                clientMessage.appendData(keysItem);
            });

        }
        clientMessage.appendBoolean(topologyChangedStrategy === null);
        if (topologyChangedStrategy !== null) {
            clientMessage.appendString(topologyChangedStrategy);
        }
        clientMessage.updateFrameLength();
        return clientMessage;
    }

    static decodeResponse(clientMessage: ClientMessage, toObjectFunction: (data: Data) => any = null) {
        // Decode response from client message
        var parameters: any = {
            'response': null
        };


        var responseSize = clientMessage.readInt32();
        var response: any = [];
        for (var responseIndex = 0; responseIndex < responseSize; responseIndex++) {
            var responseItem: any;
            var responseItemKey: Data;
            var responseItemVal: any;
            responseItemKey = clientMessage.readData();
            responseItemVal = clientMessage.readData();
            responseItem = [responseItemKey, responseItemVal];
            response.push(responseItem)
        }
        parameters['response'] = response;

        return parameters;
    }


}
