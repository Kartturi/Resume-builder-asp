using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ResumeBuilder.Models
{
    public partial class WorkData
    {
        public int WorkId { get; set; }
        public string Company { get; set; }
        public string Position { get; set; }
        public string Time { get; set; }
        public string Description { get; set; }
        public int ResumeId { get; set; }
        [JsonIgnore]
        public virtual ResumeData Resume { get; set; }
    }
}
