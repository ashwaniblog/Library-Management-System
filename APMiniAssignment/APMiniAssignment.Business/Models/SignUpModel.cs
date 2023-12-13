using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace APMiniAssignment.Business.Models
{
    public class SignUpModel
    {
        [Required(ErrorMessage = "Enter your Full Name")]
        [Display(Name = "Full Name")]
        [StringLength(50)]
        public string FullName { get; set; }

        [Required(ErrorMessage = "Enter your Email")]
        [Display(Name = "Email")]
        [EmailAddress(ErrorMessage = "Enter Valid Email")]
        public string Email { get; set; }


        [Required(ErrorMessage = "Enter your Password")]
        [Display(Name = "Password")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [NotMapped]
        [Required(ErrorMessage = "Enter your Password")]
        [Display(Name = "Confirm Password")]
        public string ConfirmPassword { get; set; }

        [Required(ErrorMessage = "Value between 1 to 10"), Range(1, 10)]
        [Display(Name = "Tokens Available")]
        public int TokensAvailable { get; set; }

        [Required(ErrorMessage = "Books borrowed value")]
        [Display(Name = "Books Borrowed")]
        public int BooksBorrowed { get; set; }

        [Required(ErrorMessage = "Books lent value")]
        [Display(Name = "Books lent")]
        public int Bookslent { get; set; }


    }
}
