using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APMiniAssignment.Business.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string? FullName { get; set; }
        public int Token_Available { get; set; }
        public int Books_Borrowed { get; set; }
        public int Books_lent { get; set; }


    }
}
