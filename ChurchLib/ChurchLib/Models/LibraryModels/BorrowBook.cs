using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace ChurchLib.Models.LibraryModels
{
    public class BorrowBook
    {
        [ForeignKey("Book")]
        public int BorrowBookID { get; set; }
        public int ReaderID { get; set; }
        public DateTime borrowDate { get; set; }
        public DateTime dueDate { get; set; }

        public virtual Reader Reader { get; set; }
        public virtual Book Book { get; set; }
        public virtual Delay Delay { get; set; }
        
    }
}