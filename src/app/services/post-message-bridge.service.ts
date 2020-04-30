import { Injectable } from '@angular/core';
import { IPostMessageBridge, IPostMessageEventTarget, PostMessageBridgeFactory } from 'ngx-post-message';

@Injectable({providedIn:'root'})
export class PostMessageBridgeQCRM {
    private bridge: IPostMessageBridge = null;

    constructor(private bridgeFactory: PostMessageBridgeFactory) {        
        if (this.bridge == null) {            
            this.bridge =  this.bridgeFactory.makeInstance();
        }
    }

    getInstance(listener: string): IPostMessageBridge {        
        this.bridge.removeAllListeners(listener);
        return this.bridge;
    }
}