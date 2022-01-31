# Generated by Django 2.2.25 on 2022-01-15 20:14

import uuid

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("usersapp", "0002_auto_20220115_2013"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="uuid",
            field=models.UUIDField(
                default=uuid.UUID("55cb562e-6100-42af-8307-bd7b9facd11c"), primary_key=True, serialize=False
            ),
        ),
    ]