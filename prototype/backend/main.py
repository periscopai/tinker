import uvicorn
import sys
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import pai_gst_sequencer

SEQ_STATES = {
    '10':'CREATED',
    '11':'ERROR',
    '12':'RUNNING',
    '13':'STOPPED',
}

seq = pai_gst_sequencer.PAISequencer("whatever")
app = FastAPI()

@app.get("/api/")
def read_root():
    """ A polite hello world
    """
    return {"message": "Ai There! Fakayuuuuuu"}


@app.get("/api/sequencer/state")
def get_state():
    """ Returns the state of the sequencer.
    """
    state = str(seq.state())
    return {"sequencer state": SEQ_STATES.get(state, f"Unexpected state {state}")}

@app.post("/api/sequencer/start")
def start():
    """ Sets the sequencer in play state
    """
    seq.start()
    return get_state()

@app.post("/api/sequencer/stop")
def stop():
    """ Stops the sequencer
    """
    seq.stop()
    return get_state()

if __name__ == "__main__":
    uvicorn.run("main:app", port=8000, reload=True)
