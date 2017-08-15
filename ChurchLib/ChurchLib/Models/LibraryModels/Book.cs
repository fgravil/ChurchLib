using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ChurchLib.Models.LibraryModels
{
    public class Book
    {
        public Book()
        {
            this.Genres = new HashSet<Genre>();
        }
        public int BookID { get; set; }
        [Required, StringLength(80)]
        public string title { get; set; }
        [Required, StringLength(40)]
        public string author { get; set; }
        [Required, StringLength(13)]
        public string ISBN { get; set; }
        public int year { get; set; }
        [StringLength(300)]
        public string description { get; set; }
        public string imageUrl { get; set; }

        public virtual ICollection<Genre> Genres { get; set; }
        public virtual Transaction Transaction { get; set; }

    }
}