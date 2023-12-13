using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APMiniAssignment.Business.Models
{
    public class BorrowModel
    {
        public int Id { get; set; }
        public string Lent_By_User_id { get; set; }

        public string Currently_Borrowed_By_User_Id { get; set; }
    }
}
