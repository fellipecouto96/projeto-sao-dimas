using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using WebSiteSaoDima.Models;

namespace WebSiteSaoDima.Controllers
{
    public class SantoController : Controller
    {
        private Trab_LabEntities db = new Trab_LabEntities();

        // GET: Santo
        public ActionResult Index()
        {
            return View(db.Santo.ToList());
        }

        // GET: Santo/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Santo santo = db.Santo.Find(id);
            if (santo == null)
            {
                return HttpNotFound();
            }
            return View(santo);
        }

        // GET: Santo/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Santo/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "id,nome,varb")] Santo santo)
        {
            if (ModelState.IsValid)
            {
                db.Santo.Add(santo);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(santo);
        }

        // GET: Santo/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Santo santo = db.Santo.Find(id);
            if (santo == null)
            {
                return HttpNotFound();
            }
            return View(santo);
        }

        // POST: Santo/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "id,nome,varb")] Santo santo)
        {
            if (ModelState.IsValid)
            {
                db.Entry(santo).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(santo);
        }

        // GET: Santo/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Santo santo = db.Santo.Find(id);
            if (santo == null)
            {
                return HttpNotFound();
            }
            return View(santo);
        }

        // POST: Santo/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Santo santo = db.Santo.Find(id);
            db.Santo.Remove(santo);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
