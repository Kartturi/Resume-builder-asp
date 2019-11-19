using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ResumeBuilder.Models;
using ResumeBuilder.utils;
using IronPdf;


namespace ResumeBuilder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DownloadController : ControllerBase
    {

        //api/init/test
        [HttpGet]
        public string GetHTMLPageAsPDF([FromBody] string result)
        {
            var getHTML = new CreateResumeHtml();
            var Renderer = new IronPdf.HtmlToPdf();
            var PDF = Renderer.RenderHtmlAsPdf(result);
            
            

            
        }







    }
}
