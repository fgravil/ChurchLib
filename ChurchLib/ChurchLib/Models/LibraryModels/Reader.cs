using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ChurchLib.Models.LibraryModels
{
    public class Reader
    {
        public int ReaderID { get; set; }
        [StringLength(20)]
        public string firstName { get; set; }
        [StringLength(20)]
        public string lastName { get; set; }
        [Required]
        public string email { get; set; }
        public string phone { get; set; }

        public virtual ICollection<BorrowBook> BorrowedBooks { get; set; }
    }
}