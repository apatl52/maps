# Generated by Django 3.2.24 on 2024-02-25 16:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('directory', '0021_auto_20240225_1048'),
    ]

    operations = [
        migrations.AlterField(
            model_name='coopaddresstags',
            name='coop',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='coop_address_tags', to='directory.coop'),
        ),
    ]