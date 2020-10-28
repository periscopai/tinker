import time
import pytest
import pai_gst_sequencer

@pytest.yield_fixture()
def ai_sequencer():
    seq = pai_gst_sequencer.PAISequencer("whatever") # Right now we don't process the source.
    yield seq
    seq.stop()


def test_state_machine(ai_sequencer):
    assert ai_sequencer.state() == ai_sequencer.CREATED
    ai_sequencer.start()
    assert ai_sequencer.state() == ai_sequencer.RUNNING
    time.sleep(5)
    ai_sequencer.stop()
    assert ai_sequencer.state() == ai_sequencer.STOPPED

