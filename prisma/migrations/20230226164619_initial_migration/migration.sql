-- CreateTable
CREATE TABLE "ar_internal_metadata" (
    "key" VARCHAR NOT NULL,
    "value" VARCHAR,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "ar_internal_metadata_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "child_developers" (
    "id" BIGSERIAL NOT NULL,
    "child_id" BIGINT,
    "eat" VARCHAR,
    "sleep" VARCHAR,
    "urine" VARCHAR,
    "feces" VARCHAR,
    "toilet_problem" VARCHAR,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "toilet_problem_description" VARCHAR,
    "p_eat" VARCHAR,
    "eat_description" VARCHAR,
    "p_sleep" VARCHAR,
    "sleep_description" VARCHAR,
    "p_urine" VARCHAR,
    "urine_description" VARCHAR,
    "p_feces" VARCHAR,
    "feces_description" VARCHAR,
    "p_toilet_problem" VARCHAR,

    CONSTRAINT "child_developers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "child_pregnancies" (
    "id" BIGSERIAL NOT NULL,
    "child_id" BIGINT,
    "pregnancy" VARCHAR,
    "birth_delay" VARCHAR,
    "birth_category" VARCHAR,
    "birth_after_effect" VARCHAR,
    "weight" VARCHAR,
    "health" VARCHAR,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "pregnancy_description" VARCHAR,
    "birth_delay_description" VARCHAR,
    "birth_after_effect_description" VARCHAR,
    "health_description" VARCHAR,
    "birth_category_description" VARCHAR,
    "p_health" VARCHAR,

    CONSTRAINT "child_pregnancies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "children" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR,
    "birthday" DATE,
    "address" VARCHAR,
    "province_id" BIGINT,
    "district_id" BIGINT,
    "sub_district_id" BIGINT,
    "zip_code" INTEGER,
    "image_file_name" VARCHAR,
    "image_content_type" VARCHAR,
    "image_file_size" INTEGER,
    "image_updated_at" TIMESTAMP(6),
    "user_id" BIGINT,
    "gender_id" BIGINT,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "total_child" INTEGER,
    "number_child" INTEGER,

    CONSTRAINT "children_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "districts" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR,
    "province_id" BIGINT,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "districts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doctors" (
    "id" BIGSERIAL NOT NULL,
    "hospital_id" BIGINT,
    "user_id" BIGINT,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "image_file_name" VARCHAR,
    "image_content_type" VARCHAR,
    "image_file_size" INTEGER,
    "image_updated_at" TIMESTAMP(6),
    "first_name" VARCHAR,
    "last_name" VARCHAR,

    CONSTRAINT "doctors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "genders" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "genders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hospital_types" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "hospital_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hospitals" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR,
    "phone" VARCHAR,
    "lat" VARCHAR,
    "lng" VARCHAR,
    "hospital_type_id" BIGINT,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "region_id" BIGINT,

    CONSTRAINT "hospitals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "provinces" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "provinces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "regions" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "regions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schema_migrations" (
    "version" VARCHAR NOT NULL,

    CONSTRAINT "schema_migrations_pkey" PRIMARY KEY ("version")
);

-- CreateTable
CREATE TABLE "screening_comments" (
    "id" BIGSERIAL NOT NULL,
    "comment" VARCHAR,
    "screening_id" BIGINT,
    "doctor_id" BIGINT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "screening_comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "screening_details" (
    "id" BIGSERIAL NOT NULL,
    "answered" BOOLEAN,
    "screening_id" BIGINT,
    "screening_question_id" BIGINT,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "screening_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "screening_media" (
    "id" BIGSERIAL NOT NULL,
    "file_file_name" VARCHAR,
    "file_content_type" VARCHAR,
    "file_file_size" INTEGER,
    "file_updated_at" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "screening_id" BIGINT,

    CONSTRAINT "screening_media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "screening_questions" (
    "id" BIGSERIAL NOT NULL,
    "question" VARCHAR,
    "answered" BOOLEAN,
    "correct_score" DOUBLE PRECISION,
    "fail_answer" DOUBLE PRECISION,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "screening_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "screening_results" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR,
    "max" DOUBLE PRECISION,
    "min" DOUBLE PRECISION,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "description" VARCHAR,

    CONSTRAINT "screening_results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "screenings" (
    "id" BIGSERIAL NOT NULL,
    "score" DOUBLE PRECISION,
    "child_id" BIGINT,
    "screening_result_id" BIGINT,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "is_guest" BOOLEAN DEFAULT false,

    CONSTRAINT "screenings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT,
    "access_token" VARCHAR,
    "is_active" BOOLEAN,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sub_districts" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR,
    "province_id" BIGINT,
    "district_id" BIGINT,
    "zip_code" INTEGER,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "sub_districts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suggestion_categories" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "suggestion_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suggestion_details" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR,
    "description" VARCHAR,
    "image_file_name" VARCHAR,
    "image_content_type" VARCHAR,
    "image_file_size" INTEGER,
    "image_updated_at" TIMESTAMP(6),
    "suggestion_category_id" BIGINT,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "image_url" VARCHAR,

    CONSTRAINT "suggestion_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "username" VARCHAR,
    "crypted_password" VARCHAR,
    "role_id" BIGINT,
    "facebook_id" VARCHAR,
    "google_id" VARCHAR,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "child_developers" ADD CONSTRAINT "child_developers_child_id_fkey" FOREIGN KEY ("child_id") REFERENCES "children"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "child_pregnancies" ADD CONSTRAINT "child_pregnancies_child_id_fkey" FOREIGN KEY ("child_id") REFERENCES "children"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "children" ADD CONSTRAINT "children_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "districts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "children" ADD CONSTRAINT "children_gender_id_fkey" FOREIGN KEY ("gender_id") REFERENCES "genders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "children" ADD CONSTRAINT "children_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "provinces"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "children" ADD CONSTRAINT "children_sub_district_id_fkey" FOREIGN KEY ("sub_district_id") REFERENCES "sub_districts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "children" ADD CONSTRAINT "children_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "districts" ADD CONSTRAINT "districts_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "provinces"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "hospitals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hospitals" ADD CONSTRAINT "hospitals_hospital_type_id_fkey" FOREIGN KEY ("hospital_type_id") REFERENCES "hospital_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hospitals" ADD CONSTRAINT "hospitals_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "regions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "screening_comments" ADD CONSTRAINT "screening_comments_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "screening_comments" ADD CONSTRAINT "screening_comments_screening_id_fkey" FOREIGN KEY ("screening_id") REFERENCES "screenings"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "screening_details" ADD CONSTRAINT "screening_details_screening_id_fkey" FOREIGN KEY ("screening_id") REFERENCES "screenings"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "screening_details" ADD CONSTRAINT "screening_details_screening_question_id_fkey" FOREIGN KEY ("screening_question_id") REFERENCES "screening_questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "screening_media" ADD CONSTRAINT "screening_media_screening_id_fkey" FOREIGN KEY ("screening_id") REFERENCES "screenings"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "screenings" ADD CONSTRAINT "screenings_child_id_fkey" FOREIGN KEY ("child_id") REFERENCES "children"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "screenings" ADD CONSTRAINT "screenings_screening_result_id_fkey" FOREIGN KEY ("screening_result_id") REFERENCES "screening_results"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sub_districts" ADD CONSTRAINT "sub_districts_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "districts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sub_districts" ADD CONSTRAINT "sub_districts_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "provinces"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "suggestion_details" ADD CONSTRAINT "suggestion_details_suggestion_category_id_fkey" FOREIGN KEY ("suggestion_category_id") REFERENCES "suggestion_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;
