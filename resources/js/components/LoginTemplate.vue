<template>
    <div>
        <section class="content">
            <div class="row">
                <div class="col-md-6 col-md-offset-4">
                    <form method="post" enctype="multipart/form-data" style="margin-top: 40px">
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-8">
                                    <label>Email Address</label>
                                    <input type="email"  class="form-control" name="email_address" placeholder="Enter Email Address">
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-8">
                                    <label>Password</label>
                                    <input type="password"  class="form-control" name="password" placeholder="Enter Password">
                                </div>
                            </div>
                        </div>
                        <div class="box-footer">
                            <button type="submit" class="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </div>
</template>
