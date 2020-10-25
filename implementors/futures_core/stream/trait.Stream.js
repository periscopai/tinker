(function() {var implementors = {};
implementors["futures_channel"] = [{"text":"impl&lt;T&gt; Stream for Receiver&lt;T&gt;","synthetic":false,"types":[]},{"text":"impl&lt;T&gt; Stream for UnboundedReceiver&lt;T&gt;","synthetic":false,"types":[]}];
implementors["futures_core"] = [];
implementors["glib"] = [{"text":"impl&lt;F, T&gt; Stream for SourceStream&lt;F, T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;F: FnOnce(UnboundedSender&lt;T&gt;) -&gt; Source + 'static,&nbsp;</span>","synthetic":false,"types":[]}];
implementors["gstreamer"] = [{"text":"impl Stream for BusStream","synthetic":false,"types":[]}];
if (window.register_implementors) {window.register_implementors(implementors);} else {window.pending_implementors = implementors;}})()