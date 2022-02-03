// fungsi untuk screenshot dan download image preview versi 1
$(function() {
    $("#btnSave").click(function() {
      html2canvas($(".takethis"), {
        onrendered: function(canvas) {
          Canvas2Image.saveAsPNG(canvas);
        }
      });
    });
  
    $("#btnSave2").click(function() {
      html2canvas($(".takethis"), {
        onrendered: function(canvas) {
          saveAs(canvas.toDataURL(), 'image.png');
        }
      });
    });
  
    function saveAs(uri, filename) {
      var link = document.createElement('a');
      if (typeof link.download === 'string') {
        link.href = uri;
        link.download = filename;
  
        //Firefox requires the link to be in the body
        document.body.appendChild(link);
  
        //simulate click
        link.click();
  
        //remove the link when done
        document.body.removeChild(link);
      } else {
        window.open(uri);
      }
    }
  });
  
  
  // fungsi untuk screenshot dan download image preview versi 1
  
  //document.querySelector('#save2').addEventListener('click', function() {
  //   html2canvas(document.querySelector('.takethis'), {
  //       onrendered: function(canvas) {
  ////                 document.body.appendChild(canvas);
  //         return Canvas2Image.saveAsPNG(canvas);
  //       }
  //   });
  //});
  
  
  // fungsi untuk screenshot dan download image preview versi 2
  
  function downloadimage() {
      var node = document.getElementById('capthis');
      domtoimage.toPng(node)
          .then(function (dataUrl) {
          var img = new Image();
          img.src = dataUrl;
          downloadURI(dataUrl, "image.png")
      })
          .catch(function (error) {
          console.error('oops, something went wrong!', error);
      });    
  }
  
  function downloadURI(uri, name) {
      var link = document.createElement("a");
      link.download = name;
      link.href = uri;
      document.body.appendChild(link);
      link.click();
  }
  
  
  // fungsi upload dan replace image statis, untuk banner standar
  
  function readURL(input) {
     if (input.files && input.files[0]) {
         var reader = new FileReader();
  
         reader.onload = function (e) {
             $('#displayad').attr('src', e.target.result);
         };
  
         reader.readAsDataURL(input.files[0]);
     }
  }
      
  function readURL2(input) {
     if (input.files && input.files[0]) {
         var reader = new FileReader();
  
         reader.onload = function (e) {
             $('#displayad2').attr('src', e.target.result);
         };
  
         reader.readAsDataURL(input.files[0]);
     }
  }
  
  function readURL3(input) {
     if (input.files && input.files[0]) {
         var reader = new FileReader();
  
         reader.onload = function (e) {
             $('#displayad3').attr('src', e.target.result);
         };
  
         reader.readAsDataURL(input.files[0]);
     }
  }
  
  // fungsi upload dan replace video, untuk video
  
  $(document).ready(function() {
      $("#videoSourceWrapper").show();
  });
  $('#uploadVideoFile').on('change', function() {
      var fileInput = document.getElementById("uploadVideoFile");
      console.log('Trying to upload the video file: %O', fileInput);
      if ('files' in fileInput) {
          if (fileInput.files.length === 0) {
              alert("Select a file to upload");
          } else {
              var $source = $('#videoSource');
              $source[0].src = URL.createObjectURL(this.files[0]);
              $source.parent()[0].load();
              $("#videoSourceWrapper").show();
              UploadVideo(fileInput.files[0]);
          }
      } else {
          console.log('No found "files" property');
      }
  });
  
  function UploadVideo(file) {
      var loaded = 0;
      var chunkSize = 500000;
      var total = file.size;
      var reader = new FileReader();
      var slice = file.slice(0, chunkSize);
      // Reading a chunk to invoke the 'onload' event
      reader.readAsBinaryString(slice);
      console.log('Started uploading file "' + file.name + '"');
      $('#uploadVideoProgressBar').show();
      reader.onload = function(e) {
          //Just simulate API
          setTimeout(function() {
              loaded += chunkSize;
              var percentLoaded = Math.min((loaded / total) * 100, 100);
              console.log('Uploaded ' + Math.floor(percentLoaded) + '% of file "' + file.name + '"');
              $('#uploadVideoProgressBar').width(percentLoaded + "%");
              //Read the next chunk and call 'onload' event again
              if (loaded <= total) {
                  slice = file.slice(loaded, loaded + chunkSize);
                  reader.readAsBinaryString(slice);
              } else {
                  loaded = total;
                  console.log('File "' + file.name + '" uploaded successfully!');
                  $('#uploadVideoProgressBar').hide();
                  document.getElementById("video").play();
              }
          }, 250);
      }
  }
  
  function PostChunk() {
      //Send the sliced chunk to the REST API
      $.ajax({
          url: "http://api/url/etc",
          type: "POST",
          data: slice,
          processData: false,
          contentType: false,
          error: (function(errorData) {
              console.log(errorData);
              alert("Video Upload Failed");
          })
      }).done(function(e) {
          //The chunk is successfully uploaded!
          loaded += chunkSize;
          var percentLoaded = Math.min((loaded / total) * 100, 100);
          console.log('Uploaded ' + Math.floor(percentLoaded) + '% of file "' + file.name + '"');
          $('#uploadVideoProgressBar').width(percentLoaded + "%");
          //Read the next chunk and call 'onload' event again
          if (loaded <= total) {
              slice = file.slice(loaded, loaded + chunkSize);
              isFirstChunk = false;
              reader.readAsBinaryString(slice);
          } else {
              loaded = total;
              console.log('File "' + file.name + '" uploaded successfully!');
              $('#uploadVideoProgressBar').hide();
              document.getElementById("video").play();
          }
      });
  }
  
  
  $('input[type="file"]').change(function(e){
      var fileName = e.target.files[0].name;
      $(e.target).siblings('.custom-file-label').html(fileName);
  });
  
  
  
  
  