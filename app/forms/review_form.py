from flask_wtf import FlaskForm
from wtforms import TextAreaField, SubmitField, IntegerField
from wtforms.validators import DataRequired, ValidationError


def validate_stars(form, field):
    stars = field.data
    if stars < 1 or stars > 5:
        raise ValidationError("Stars must be between 1 and 5.")


class ReviewForm(FlaskForm):
    review = TextAreaField("Title", validators=[DataRequired()])
    stars = IntegerField("Stars", validators=[DataRequired(), validate_stars])
    submit = SubmitField("Submit")
