using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
namespace ResumeBuilder.Models
{
    public partial class Language
    {
        public int LanguageId { get; set; }
        public string Language1 { get; set; }
        public string Level { get; set; }
        public int ResumeId { get; set; }
        [JsonIgnore]
        public virtual ResumeData Resume { get; set; }
    }
}
