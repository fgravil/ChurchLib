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
            this.Book = new HashSet<Book>();
        }
        public int GenreID { get; set; }
        public string genre { get; set; }
        public virtual ICollection<Book> Book { get; set; }
    }
}