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
import {MultiMapMessageType} from './MultiMapMessageType';

var REQUEST_TYPE = MultiMapMessageType.MULTIMAP_FORCEUNLOCK;
var RESPONSE_TYPE = 100;
var RETRYABLE = true;


export class MultiMapForceUnlockCodec {


    static calculateSize(name: string, key: Data, referenceId: any) {
// Calculates the request payload size
        var dataSize: number = 0;
        dataSize += BitsUtil.calculateSizeString(name);
        dataSize += BitsUtil.calculateSizeData(key);
        dataSize += BitsUtil.LONG_SIZE_IN_BYTES;
        return dataSize;
    }

    static encodeRequest(name: string, key: Data, referenceId: any) {
// Encode request into clientMessage
        var clientMessage = ClientMessage.newClientMessage(this.calculateSize(name, key, referenceId));
        clientMessage.setMessageType(REQUEST_TYPE);
        clientMessage.setRetryable(RETRYABLE);
        clientMessage.appendString(name);
        clientMessage.appendData(key);
        clientMessage.appendLong(referenceId);
        clientMessage.updateFrameLength();
        return clientMessage;
    }

// Empty decodeResponse(ClientMessage), this message has no parameters to decode


}
