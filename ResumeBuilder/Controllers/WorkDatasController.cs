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
    [Route("api/[controller]")]
    [ApiController]
    public class WorkDatasController : ControllerBase
    {
        private readonly ResumeBuilderContext _context;

        public WorkDatasController(ResumeBuilderContext context)
        {
            _context = context;
        }

        // GET: api/WorkDatas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorkData>>> GetWorkData()
        {
            return await _context.WorkData.ToListAsync();
        }

        // GET: api/WorkDatas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WorkData>> GetWorkData(int id)
        {
            var workData = await _context.WorkData.FindAsync(id);

            if (workData == null)
            {
                return NotFound();
            }

            return workData;
        }

        // PUT: api/WorkDatas/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWorkData(int id, WorkData workData)
        {
            int resumeId = id;
            int workId = workData.WorkId;
            var works = _context.WorkData.First(l => l.WorkId == workId);

            works.Position = workData.Position;
            works.Company = workData.Company;
            works.Time = workData.Time;
            works.Description = workData.Description;

            await _context.SaveChangesAsync();


            return NoContent();
        }

        // POST: api/WorkDatas
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost("{id}")]
        public async Task<ActionResult<WorkData>> PostWorkData(int id, WorkData workData)
        {
            _context.WorkData.Add(workData);
            
            await _context.SaveChangesAsync();
            
            var newWorkData = await _context.WorkData.Where(l => l.ResumeId == id).ToListAsync();

            return Ok(newWorkData);
        }

        // DELETE: api/WorkDatas/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<WorkData>> DeleteWorkData(int id)
        {
            var workData = await _context.WorkData.FindAsync(id);
            if (workData == null)
            {
                return NotFound();
            }
            int resumeId = workData.ResumeId;
            _context.WorkData.Remove(workData);
            await _context.SaveChangesAsync();

            return Ok(await _context.WorkData.Where(l => l.ResumeId == resumeId).ToListAsync());
        }

        private bool WorkDataExists(int id)
        {
            return _context.WorkData.Any(e => e.WorkId == id);
        }
    }
}
