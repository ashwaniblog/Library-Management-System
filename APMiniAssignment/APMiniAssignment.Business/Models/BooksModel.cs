using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace APMiniAssignment.Business.Models
{
    public class BooksModel
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        
        public string Name { get; set; }

        [Required,Range(0,5)]
        public int Rating { get; set; }

        [Required]
        [MaxLength(100)]
        
        public string Author { get; set; }

        [Required]
        [MaxLength(100)]
        public string Genre { get; set; }

        [Required]
        [Display(Name = "Is Book Available")]
        public bool Is_Book_Available { get; set; }

        [Required]
        [MaxLength(100)]
        public string Description { get; set; }

        [Required]
        [MaxLength(100)]
        [Display(Name = "Lent By User id")]
        public string Lent_By_User_id { get; set; }

      
        [Required]
        [MaxLength(100)]
        [Display(Name = "Currently Borrowed By User Id")]
        public string Currently_Borrowed_By_User_Id { get; set; }
        

    }
}
