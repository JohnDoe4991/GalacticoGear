from flask_wtf import FlaskForm
from wtforms import SubmitField, StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired

class ProductForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired()])
    image = FileField("Select a Photo", validators=[FileRequired(), FileAllowed(["pdf", "png", "jpg", "jpeg", "gif"])])
    description = TextAreaField("Description", validators=[DataRequired()])
    size = StringField("Size", validators=[DataRequired()])
    price = IntegerField("Price", validators=[DataRequired()])
    submit = SubmitField("Submit")
