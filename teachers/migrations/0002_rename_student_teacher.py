# Generated by Django 4.2.7 on 2024-03-23 23:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('teachers', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Student',
            new_name='Teacher',
        ),
    ]
