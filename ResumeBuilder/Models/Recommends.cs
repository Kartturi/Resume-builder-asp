using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
namespace ResumeBuilder.Models
{
    public partial class Recommends
    {
        public int RecommendsId { get; set; }
        public string NameRecommends { get; set; }
        public string PhoneRecommends { get; set; }
        public string Email { get; set; }
        public int ResumeId { get; set; }
        [JsonIgnore]
        public virtual ResumeData Resume { get; set; }
    }
}
