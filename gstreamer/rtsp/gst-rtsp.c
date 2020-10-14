/* A sample RTSP streaming application.

  author: Laurent Brack
*/
#include <stdio.h>
#include <gst/gst.h>

const gchar* description = "\
  This application creates a gstreamer pipeline using either the camera\n\
  as the source or a video file.\n\
  \n\
  The data should be decoded (in the case of a file), then encoded and\n\
  sent over RTSP. \
";

/* This structure describes the pipeline

*/
typedef struct _AIPipeline
{
  GstElement *pipeline;
  GstElement *source_camera;
  GstElement *source_file;
  GstElement *rstp_sink; /**/ 
} AIPipeline;

typedef struct _RTPSOptions
{
  gboolean silent;          // 
  gboolean loop;            // loop over the source
  gint     streaming_time;  // time to stream data for (implies potential looping)
  gint     frames;          // number of frames to streams. 
  gchar*   input_file;      // input file
  gchar*   output_file;     // file where video is to be captured 

} RTPSOptions; 

int
main (int argc, char *argv[])
{
  static AIPipeline aipipeline;
  static RTPSOptions options; 
  gint exit_code = 0;


  /**********************************************************************/
  /* Option processing - this should be in a function
  */
  GOptionContext *ctx;
  GError *err = NULL;
  /* glib option enty 
    struct GOptionEntry {
      const gchar *long_name;
      gchar        short_name;
      gint         flags;

      GOptionArg   arg;
      gpointer     arg_data;

      const gchar *description;
      const gchar *arg_description;
    };  

    Note that:
      G_OPTION_ARG_NONE      mapped to gboolean;
      G_OPTION_ARG_FILENAME  * gchar. The value must be freed.

      G_OPTION_ARG_FILENAME must be freed with g_free()
      

  see https://developer.gnome.org/glib/stable/glib-Commandline-option-parser.html#GOptionEntry
  */
  GOptionEntry entries[] = {
    { "silent", 's', 0, G_OPTION_ARG_NONE, &options.silent,
      "do not output status information", NULL },

    { "loop", 'l', 0, G_OPTION_ARG_NONE, &options.loop,
      "loop over the input file if specified.", NULL },  

    { "time", 't', 0, G_OPTION_ARG_NONE, &options.streaming_time,
      "if set, run for the specified amount of time - in seconds", NULL },  

    { "frames", 'f', 0, G_OPTION_ARG_NONE, &options.frames,
      "number of frames to streams.", NULL }, 

    { "input-file", 'i', 0, G_OPTION_ARG_FILENAME, &options.input_file,
      "[optional] input video file to decode (assumes camera otherwise)", NULL }, 

    { "output-file", 'o', 0, G_OPTION_ARG_FILENAME, &options.output_file,
      "[optional] file to capture streamed output", NULL }, 


    { NULL }
  };
  // We create a context and add the entries
  ctx = g_option_context_new ("RTSP Pipeline");

  g_option_context_set_summary(ctx, description);
  
  g_option_context_add_main_entries (ctx, entries, NULL);

  g_option_context_add_group (ctx, gst_init_get_option_group ());
  // We parse the options
  if (!g_option_context_parse (ctx, &argc, &argv, &err)) {
      g_print ("Failed to initialize: %s\n", err->message);
      g_clear_error (&err);
      g_option_context_free (ctx);
      exit_code = 1;
      goto terminate;
    }
  g_option_context_free (ctx);
  /**********************************************************************/

  if (options.silent == FALSE){
    g_print("\tsilent           = %d\n", options.silent);
    g_print("\tloop             = %d\n", options.loop);
    g_print("\tstreaming_time   = %d seconds\n", options.streaming_time);
    g_print("\tframes           = %d\n", options.frames);
    g_print("\tinput file       = %s\n", options.input_file);
    g_print("\toutput file      = %s\n", options.output_file);
  }



  /* Initialize GStreamer */
  gst_init (&argc, &argv);

  g_print(">> building the AI Pipeline\n");

  /* Create the empty pipeline */
  aipipeline.pipeline = gst_pipeline_new ("periscopai-pipeline");

terminate:
  g_free(options.input_file);
  g_free(options.output_file);
  gst_object_unref(aipipeline.pipeline);

  if (exit_code){
    g_print(">> we f***** up :(\n");
  }  
  else {
    g_print(">> asta la vista!\n");
  }
  return exit_code;
}