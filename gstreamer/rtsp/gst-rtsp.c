#include <stdio.h>
#include <gst/gst.h>


int
main (int argc, char *argv[])
{

  gboolean silent = FALSE;
  GOptionContext *ctx;
  GError *err = NULL;
  GstElement *pipeline;
  GstBus *bus;
  GstMessage *msg;


  // ***************************************************************************
  // CUSTOM OPTION PARSING USING GLIB
  //
  // We can add additional configuration options here. 
  // This is all glib stuff BTW
  GOptionEntry entries[] = {
    { "silent", 's', 0, G_OPTION_ARG_NONE, &silent,
      "do not output status information", NULL },
    { NULL }
  };

  // We create a context and add the entries
  ctx = g_option_context_new ("RTSP Pipeline");
  g_option_context_add_main_entries (ctx, entries, NULL);
  g_option_context_add_group (ctx, gst_init_get_option_group ());
  // We parse the options
  if (!g_option_context_parse (ctx, &argc, &argv, &err)) {
      g_print ("Failed to initialize: %s\n", err->message);
      g_clear_error (&err);
      g_option_context_free (ctx);
      return 1;
    }
  g_option_context_free (ctx);
  printf ("Run me with --help to see the Application options appended.\n");  
  printf("silent mode %d", silent);

  // ***************************************************************************
  // Initialize GStreamer 
  // load plugins
  // parse command line arguments.

  gst_init (&argc, &argv);


  // ***************************************************************************
  // Build the pipeline 
  // Build the pi
  pipeline =
      gst_parse_launch
      ("playbin uri=https://www.freedesktop.org/software/gstreamer-sdk/data/media/sintel_trailer-480p.webm",
      NULL);

  /* Start playing */
  gst_element_set_state (pipeline, GST_STATE_PLAYING);

  /* Wait until error or EOS */
  bus = gst_element_get_bus (pipeline);
  // This call will block until one of the condition is met.
  msg =
      gst_bus_timed_pop_filtered (bus, GST_CLOCK_TIME_NONE,
      GST_MESSAGE_ERROR | GST_MESSAGE_EOS);

  /* Free resources */
  if (msg != NULL)
    gst_message_unref (msg);
  gst_object_unref (bus);
  gst_element_set_state (pipeline, GST_STATE_NULL);
  gst_object_unref (pipeline);
  return 0;
}