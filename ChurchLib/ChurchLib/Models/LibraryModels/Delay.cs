using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace ChurchLib.Models.LibraryModels
{
    public class Delay
    {
        [ForeignKey("BorrowBook")]
        public int DelayID { get; set; }
        public int delayDays { get; set; }
        public decimal money { get; set; }
        public string memo { get; set; }

        public virtual BorrowBook BorrowBook{ get; set; }

    }
}