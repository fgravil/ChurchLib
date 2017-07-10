using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ChurchLib.Models.LibraryModels
{
    public enum MediaType
    {
        CD,
        DVD
    }
    public class Media
    {
        public int MediaID { get; set; }
        [Required]
        public MediaType mediaType { get; set; }
        [Required, StringLength(80)]
        public string name { get; set; }
        [StringLength(100)]
        public string description { get; set; }

    }
}