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
        public Media()
        {
            this.Genres = new HashSet<Genre>();
        }
        public int MediaID { get; set; }
        [Required]
        public MediaType mediaType { get; set; }
        [Required, StringLength(80)]
        public string title { get; set; }
        public DateTime date { get; set; }
        [StringLength(300)]
        public string description { get; set; }
        public virtual ICollection<Genre> Genres { get; set; }
        public virtual Transaction Transaction { get; set; }

    }
}