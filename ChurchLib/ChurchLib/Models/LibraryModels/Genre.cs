using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ChurchLib.Models.LibraryModels
{
    public class Genre
    {
        public Genre()
        {
            this.Books = new HashSet<Book>();
            this.Media = new HashSet<Media>();
        }
        public int GenreID { get; set; }
        public string name { get; set; }
        public virtual ICollection<Book> Books { get; set; }
        public virtual ICollection<Media> Media { get; set; }
    }
}