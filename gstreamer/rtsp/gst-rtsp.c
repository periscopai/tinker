#include <stdio.h>
#include <gst/gst.h>

/* This structure describes the pipeline

*/
typedef struct _AIPipeline
{
  GstElement *pipeline;
  GstElement *source_camera;
  GstElement *source_file;
  GstElement *rstp_sink; /**/ 
} AIPipeline;

int
main (int argc, char *argv[])
{
  static AIPipeline aipipeline;

  /* Initialize GStreamer */
  gst_init (&argc, &argv);

  g_print(">> building the AI Pipeline\n");
  /* Create the empty pipeline */
  aipipeline.pipeline = gst_pipeline_new ("periscopai-pipeline");


  g_print(">> asta la vista!\n");

}