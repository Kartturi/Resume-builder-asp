using System;
using System.Collections.Generic;

namespace ResumeBuilder.Models
{
    public partial class UserData
    {
        public UserData()
        {
            ResumeData = new HashSet<ResumeData>();
        }

        public int UserId { get; set; }
        public string UserName { get; set; }

        public virtual ICollection<ResumeData> ResumeData { get; set; }
    }
}
