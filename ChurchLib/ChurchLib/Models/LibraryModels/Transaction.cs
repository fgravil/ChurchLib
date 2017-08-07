using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ChurchLib.Models.LibraryModels
{
    public class Transaction
    {
        public Transaction()
        {
            this.Books = new HashSet<Book>();
            this.Media = new HashSet<Media>();
        }
        public int TransactionID { get; set; }
        public DateTime borrowDate { get; set; }
        public DateTime dueDate { get; set; }
        public decimal delayPrice { get; set; }
        public virtual ICollection<Book> Books { get; set; }
        public virtual ICollection<Media> Media { get; set; }
    }
}