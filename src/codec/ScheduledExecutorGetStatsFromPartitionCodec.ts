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
import {ScheduledExecutorMessageType} from './ScheduledExecutorMessageType';

var REQUEST_TYPE = ScheduledExecutorMessageType.SCHEDULEDEXECUTOR_GETSTATSFROMPARTITION;
var RESPONSE_TYPE = 120;
var RETRYABLE = true;


export class ScheduledExecutorGetStatsFromPartitionCodec {


    static calculateSize(schedulerName: string, taskName: string) {
// Calculates the request payload size
        var dataSize: number = 0;
        dataSize += BitsUtil.calculateSizeString(schedulerName);
        dataSize += BitsUtil.calculateSizeString(taskName);
        return dataSize;
    }

    static encodeRequest(schedulerName: string, taskName: string) {
// Encode request into clientMessage
        var clientMessage = ClientMessage.newClientMessage(this.calculateSize(schedulerName, taskName));
        clientMessage.setMessageType(REQUEST_TYPE);
        clientMessage.setRetryable(RETRYABLE);
        clientMessage.appendString(schedulerName);
        clientMessage.appendString(taskName);
        clientMessage.updateFrameLength();
        return clientMessage;
    }

    static decodeResponse(clientMessage: ClientMessage, toObjectFunction: (data: Data) => any = null) {
        // Decode response from client message
        var parameters: any = {
            'lastIdleTimeNanos': null,
            'totalIdleTimeNanos': null,
            'totalRuns': null,
            'totalRunTimeNanos': null
        };

        if (clientMessage.isComplete()) {
            return parameters;
        }
        parameters['lastIdleTimeNanos'] = clientMessage.readLong();

        parameters['totalIdleTimeNanos'] = clientMessage.readLong();

        parameters['totalRuns'] = clientMessage.readLong();

        parameters['totalRunTimeNanos'] = clientMessage.readLong();

        return parameters;
    }


}
