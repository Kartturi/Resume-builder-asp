using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ResumeBuilder.Models;

namespace ResumeBuilder.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ResumeDatasController : ControllerBase
    {
        private readonly ResumeBuilderContext _context;

        public ResumeDatasController(ResumeBuilderContext context)
        {
            _context = context;
        }

        [HttpGet("test")]
        public IActionResult testGet()
        {
            var resumes = _context.ResumeData.Where(s => s.ResumeId == 30)
                .Include(s => s.Links)
                .Include(w => w.WorkData)
                .Include(w => w.Education)
                .Include(w => w.Language)
                .Include(w => w.Projects)
                .Include(w => w.Recommends)
                .Include(w => w.Skills)
                .ToList();
             
            return Ok(resumes);
            
        }


        // GET: api/ResumeDatas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ResumeData>>> GetResumeData()
        {
            

            return await _context.ResumeData.ToListAsync();
        }
        
        
        [HttpPost("{id}")]
        public async Task<ActionResult<IEnumerable<ResumeData>>> Duplicate(int id, ResumeData resumeData)
        {
            int ResumeId = resumeData.ResumeId;
            var newResume = await _context.ResumeData.Where(s => s.ResumeId == ResumeId)
                 .Include(s => s.Links)
                 .Include(w => w.WorkData)
                 .Include(w => w.Education)
                 .Include(w => w.Language)
                 .Include(w => w.Projects)
                 .Include(w => w.Recommends)
                 .Include(w => w.Skills)
                 .FirstOrDefaultAsync();

            if (newResume == null)
            {
                return NotFound();
            }

            newResume.ResumeId = 0;
            newResume.ResumeName = resumeData.ResumeName;
            int UserId = newResume.UserId;
            
            _context.ResumeData.Add(newResume);
            await _context.SaveChangesAsync();

            var userData = await _context.ResumeData
                .Where(u => u.UserId == id).Select(p => new { p.ResumeId, p.ResumeName, p.Layout })
                .ToListAsync();

            if (userData == null)
            {
                return NotFound();
            }

            return Ok(userData);
        }

        // GET: api/ResumeDatas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ResumeData>> GetResumeData(int id)
        {
            var resumeData = await _context.ResumeData.Where(s => s.ResumeId == id)
                .Include(s => s.Links)
                .Include(w => w.WorkData)
                .Include(w => w.Education)
                .Include(w => w.Language)
                .Include(w => w.Projects)
                .Include(w => w.Recommends)
                .Include(w => w.Skills)
                .FirstOrDefaultAsync();

            if (resumeData == null)
            {
                return NotFound();
            }

            return Ok(resumeData);
        }

        // PUT: api/ResumeDatas/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdtadeResumeData(int id, ResumeData resumeData)
        {
            
            int userId = resumeData.UserId;
            var resume = _context.ResumeData.First(r => r.ResumeId == id);
            if(resumeData.Layout != null)
            {
                resume.Layout = resumeData.Layout;
            }
           if(resumeData.ResumeName != null)
            {
                resume.ResumeName = resumeData.ResumeName;
            }
            
            
            try
            {
                await _context.SaveChangesAsync();
                
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResumeDataExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            var userData = await _context.ResumeData
                .Where(u => u.UserId == userId).Select(p => new { p.ResumeId, p.ResumeName, p.Layout })
                .ToListAsync();
            return Ok(userData);
        }

        // POST: api/ResumeDatas
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<ResumeData>> CreateResume(ResumeData resumeData)
        {
            int userId = resumeData.UserId;
            _context.ResumeData.Add(resumeData);
            await _context.SaveChangesAsync();

            var userData = await _context.ResumeData
                .Where(u => u.UserId == userId).Select(p => new { p.ResumeId, p.ResumeName, p.Layout })
                .ToListAsync();
            return Ok(userData);
        }

        // DELETE: api/ResumeDatas/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ResumeData>> DeleteResumeData(int id)
        {
            var resumeData = await _context.ResumeData.FindAsync(id);
            int userId = resumeData.UserId;
            if (resumeData == null)
            {
                return NotFound();
            }

            _context.ResumeData.Remove(resumeData);
            await _context.SaveChangesAsync();

            var userData = await _context.ResumeData
                .Where(u => u.UserId == userId).Select(p => new { p.ResumeId, p.ResumeName, p.Layout })
                .ToListAsync();
            return Ok(userData);
            
        }

        private bool ResumeDataExists(int id)
        {
            return _context.ResumeData.Any(e => e.ResumeId == id);
        }
    }
}
