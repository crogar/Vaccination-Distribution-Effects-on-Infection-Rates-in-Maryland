-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/XHCP06
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "cases" (
    "ID" INT   NOT NULL,
    "DATE" date   NOT NULL,
    "County" varchar   NOT NULL,
    "Confiramted_cases" INT   NOT NULL,
    CONSTRAINT "pk_cases" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE "vaccinations" (
    "ID" INT   NOT NULL,
    "DATE" date   NOT NULL,
    "County" varchar   NOT NULL,
    "FirstDoseDaily" INT   NOT NULL,
    "FirstDoseCummulative" INT   NOT NULL,
    "SecondDoseDaily" INT   NOT NULL,
    "SecondDoseCummulative" INT   NOT NULL,
    "SingleDoseDaily" INT   NOT NULL,
    "SingleDoseCummulative" INT   NOT NULL,
    "AtLeastOneDose" INT   NOT NULL,
    "FullyVaccinated" INT   NOT NULL,
    "FullVaccinatedCummulative" INT   NOT NULL,
    "AtLeastOneDoseCummulative" INT   NOT NULL,
    CONSTRAINT "pk_vaccinations" PRIMARY KEY (
        "ID"
     )
);

