import * as TWEEN from "tween.js";

export class PlaySmoothTweenAnim{

    _isPlaying = false;
    _currentMeshWidth = 0;

    constructor(tween,from,time){
        this.tween = tween;
        this.from = from;
        this.time = time;
    }

    play(to){
        if(this.from != to){
            if(!this._isPlaying || this._currentMeshWidth != to){
                this.tween.to({amount: to},this.time).start();
                this._isPlaying = true

                this._currentMeshWidth = to;
            }
        } else {
            this._isPlaying = false;
        }
    }

}