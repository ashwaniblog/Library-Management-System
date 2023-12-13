using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APMiniAssignment.Business.Models
{
    public class LoginResponseModel
    {
        public string Id { get; set; }
        public int Tokens { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public string Token { get; set; }
    }
}
