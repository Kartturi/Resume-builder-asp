using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
namespace ResumeBuilder.Models
{
    public partial class Links
    {
        public int LinkId { get; set; }
        public string Name { get; set; }
        public int ResumeId { get; set; }
        [JsonIgnore]
        public virtual ResumeData Resume { get; set; }
    }
}
