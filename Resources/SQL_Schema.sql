-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/XHCP06
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "cases" (
    "ID" INT   NOT NULL,
    "DATE" date   NOT NULL,
    "County" varchar   NOT NULL,
    "Confirmed_cases" INT   NOT NULL,
    CONSTRAINT "pk_cases" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE "vaccinations" (
    "ID" INT   NOT NULL,
    "DATE" date   NOT NULL,
    "County" varchar   NOT NULL,
    "FirstDoseDaily" INT   NOT NULL,
    "FirstDoseCumulative" INT   NOT NULL,
    "SecondDoseDaily" INT   NOT NULL,
    "SecondDoseCumulative" INT   NOT NULL,
    "SingleDoseDaily" INT   NOT NULL,
    "SingleDoseCumulative" INT   NOT NULL,
    "AtLeastOneDose" INT   NOT NULL,
    "FullyVaccinated" INT   NOT NULL,
    "FullVaccinatedCumulative" INT   NOT NULL,
    "AtLeastOneDoseCumulative" INT   NOT NULL,
    CONSTRAINT "pk_vaccinations" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE "gender" (
    "ID" INT   NOT NULL,
    "DATE" date   NOT NULL,
    "Gender" varchar   NOT NULL,
    "FirstDoseDaily" INT   NOT NULL,
    "FirstDoseCumulative" INT   NOT NULL,
    "SecondDoseDaily" INT   NOT NULL,
    "SecondDoseCumulative" INT   NOT NULL,
    "SingleDoseDaily" INT   NOT NULL,
    "SingleDoseCumulative" INT   NOT NULL,
    CONSTRAINT "pk_gender" PRIMARY KEY (
        "ID"
     )
);

