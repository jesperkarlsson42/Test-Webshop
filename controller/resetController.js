const resetRender = (req, res) => {
  res.render("reset.ejs", { err: " " });
};


module.exports= {
  resetRender
}