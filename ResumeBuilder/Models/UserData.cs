using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
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
        [JsonIgnore]
        public virtual ICollection<ResumeData> ResumeData { get; set; }
    }
}
