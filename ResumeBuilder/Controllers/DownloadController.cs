using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ResumeBuilder.Models;
using IronPdf;


namespace ResumeBuilder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DownloadController : ControllerBase
    {

        private readonly ResumeBuilderContext _context;

        

        //api/init/test
        [HttpGet]
        public FileResult GetHTMLPageAsPDF(long id)
        {
            var Renderer = new IronPdf.HtmlToPdf();
            //Create a PDF Document
            var PDF = Renderer.RenderUrlAsPdf("https://localhost:44318/preview?index=1");
            //return a  pdf document from a view
            //var contentLength = PDF.BinaryData.Length;
            //Response.AppendHeader("Content-Length", contentLength.ToString());
            //Response.AppendHeader("Content-Disposition", "inline; filename=Document_" + id + ".pdf");
            return File(PDF.BinaryData, "application/pdf;");

            
        }







    }
}
