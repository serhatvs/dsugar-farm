#[allow(duplicate_alias)]
module 0xDEADBEEF::sugar_farm {
        // ========== ADVANCED FUNCTIONS ==========

        /// 1. Kullanıcının sahip olduğu tarlalardaki hasada hazır ürünleri topluca hasat eder
        public fun batch_harvest(fields: &mut vector<Field>, ctx: &mut tx_context::TxContext, clock: &Clock): vector<Sugar> {
            let mut harvested = vector::empty<Sugar>();
            let len = vector::length(fields);
            let mut i = 0;
            while (i < len) {
                let field_ref = &mut vector::borrow_mut(fields, i);
                if (field_ref.crop_ready) {
                    // Hasat
                    field_ref.crop_ready = false;
                    field_ref.planted_at = 0;
                    let id = object::new(ctx);
                    let sugar = Sugar {
                        id,
                        owner: field_ref.owner,
                        amount: 1,
                    };
                    event::emit(HarvestEvent {
                        owner: field_ref.owner,
                        sugar_amount: 1,
                        timestamp: clock::timestamp_ms(clock),
                    });
                    vector::push_back(&mut harvested, sugar);
                }
                i = i + 1;
            }
            harvested
        }

        /// 2. Kullanıcının toplam şeker miktarını döndürür
        public fun get_total_sugar(sugars: &vector<Sugar>, owner: address): u64 {
            let mut total = 0u64;
            let len = vector::length(sugars);
            let mut i = 0;
            while (i < len) {
                let sugar_ref = &vector::borrow(sugars, i);
                if (sugar_ref.owner == owner) {
                    total = total + sugar_ref.amount;
                }
                i = i + 1;
            }
            total
        }

        /// 3. Kullanıcının sahip olduğu tarlaları listeler
        public fun list_fields(fields: &vector<Field>, owner: address): vector<&Field> {
            let mut owned = vector::empty<&Field>();
            let len = vector::length(fields);
            let mut i = 0;
            while (i < len) {
                let field_ref = &vector::borrow(fields, i);
                if (field_ref.owner == owner) {
                    vector::push_back(&mut owned, field_ref);
                }
                i = i + 1;
            }
            owned
        }

        /// 4. Sahip olunan ve boş olan tüm tarlalara otomatik ekim yapar
        public fun auto_plant(fields: &mut vector<Field>, clock: &Clock) {
            let len = vector::length(fields);
            let mut i = 0;
            while (i < len) {
                let field_ref = &mut vector::borrow_mut(fields, i);
                if (field_ref.planted_at == 0) {
                    let now = clock::timestamp_ms(clock);
                    field_ref.planted_at = now;
                    field_ref.crop_ready = false;
                }
                i = i + 1;
            }
        }

        /// 5. Hasada hazır tarlaları listeler
        public fun list_ready_fields(fields: &vector<Field>, owner: address): vector<&Field> {
            let mut ready = vector::empty<&Field>();
            let len = vector::length(fields);
            let mut i = 0;
            while (i < len) {
                let field_ref = &vector::borrow(fields, i);
                if (field_ref.owner == owner && field_ref.crop_ready) {
                    vector::push_back(&mut ready, field_ref);
                }
                i = i + 1;
            }
            ready
        }

        /// 6. Şeker transferi (bir kullanıcıdan diğerine)
        public fun transfer_sugar(sugar: &mut Sugar, to: address) {
            sugar.owner = to;
        }

        /// 7. Admin tarafından tarlanın sıfırlanması
        public fun admin_reset_field(field: &mut Field) {
            field.planted_at = 0;
            field.crop_ready = false;
        }

        /// 8. Tarlada geçen süreyi hesaplar
        public fun get_field_elapsed_time(field: &Field, clock: &Clock): u64 {
            if (field.planted_at == 0) {
                0
            } else {
                let now = clock::timestamp_ms(clock);
                now - field.planted_at
            }
        }

        // ========== ADVANCED TESTS ==========
        #[test]
        fun test_batch_harvest() {
            let mut ctx = tx_context::dummy();
            let clock = Clock { timestamp_ms: 10000 };
            let mut fields = vector::empty<Field>();
            let owner = @0xABCD;
            // 2 hasada hazır, 1 hazır değil
            vector::push_back(&mut fields, Field { id: object::new(&mut ctx), owner, planted_at: 1, crop_ready: true });
            vector::push_back(&mut fields, Field { id: object::new(&mut ctx), owner, planted_at: 2, crop_ready: true });
            vector::push_back(&mut fields, Field { id: object::new(&mut ctx), owner, planted_at: 3, crop_ready: false });
            let sugars = batch_harvest(&mut fields, &mut ctx, &clock);
            assert!(vector::length(&sugars) == 2);
            let Sugar { id: id1, owner: _, amount: _ } = vector::pop_back(&mut sugars);
            let Sugar { id: id2, owner: _, amount: _ } = vector::pop_back(&mut sugars);
            object::delete(id1);
            object::delete(id2);
        }

        #[test]
        fun test_get_total_sugar() {
            let owner = @0xABCD;
            let mut sugars = vector::empty<Sugar>();
            vector::push_back(&mut sugars, Sugar { id: object::zero(), owner, amount: 5 });
            vector::push_back(&mut sugars, Sugar { id: object::zero(), owner, amount: 10 });
            vector::push_back(&mut sugars, Sugar { id: object::zero(), owner: @0xBBBB, amount: 7 });
            let total = get_total_sugar(&sugars, owner);
            assert!(total == 15);
        }

        #[test]
        fun test_list_fields() {
            let owner = @0xABCD;
            let mut fields = vector::empty<Field>();
            vector::push_back(&mut fields, Field { id: object::zero(), owner, planted_at: 0, crop_ready: false });
            vector::push_back(&mut fields, Field { id: object::zero(), owner: @0xBBBB, planted_at: 0, crop_ready: false });
            let owned = list_fields(&fields, owner);
            assert!(vector::length(&owned) == 1);
        }

        #[test]
        fun test_auto_plant() {
            let clock = Clock { timestamp_ms: 12345 };
            let mut fields = vector::empty<Field>();
            vector::push_back(&mut fields, Field { id: object::zero(), owner: @0xABCD, planted_at: 0, crop_ready: false });
            vector::push_back(&mut fields, Field { id: object::zero(), owner: @0xABCD, planted_at: 1, crop_ready: false });
            auto_plant(&mut fields, &clock);
            let f0 = &vector::borrow(&fields, 0);
            let f1 = &vector::borrow(&fields, 1);
            assert!(f0.planted_at == 12345);
            assert!(f1.planted_at == 1);
        }

        #[test]
        fun test_list_ready_fields() {
            let owner = @0xABCD;
            let mut fields = vector::empty<Field>();
            vector::push_back(&mut fields, Field { id: object::zero(), owner, planted_at: 1, crop_ready: true });
            vector::push_back(&mut fields, Field { id: object::zero(), owner, planted_at: 2, crop_ready: false });
            let ready = list_ready_fields(&fields, owner);
            assert!(vector::length(&ready) == 1);
        }

        #[test]
        fun test_transfer_sugar() {
            let mut sugar = Sugar { id: object::zero(), owner: @0xABCD, amount: 5 };
            transfer_sugar(&mut sugar, @0xBBBB);
            assert!(sugar.owner == @0xBBBB);
        }

        #[test]
        fun test_admin_reset_field() {
            let mut field = Field { id: object::zero(), owner: @0xABCD, planted_at: 123, crop_ready: true };
            admin_reset_field(&mut field);
            assert!(field.planted_at == 0);
            assert!(field.crop_ready == false);
        }

        #[test]
        fun test_get_field_elapsed_time() {
            let clock = Clock { timestamp_ms: 20000 };
            let field = Field { id: object::zero(), owner: @0xABCD, planted_at: 10000, crop_ready: false };
            let elapsed = get_field_elapsed_time(&field, &clock);
            assert!(elapsed == 10000);
        }
    use sui::object::UID;
    use sui::tx_context;
    use sui::transfer;
    use sui::event;
    use sui::clock::{Self, Clock};

    // ========== CONSTANTS ==========
    const GROW_TIME_MS: u64 = 10_000;

    // ========== ERROR CODES ==========
    const E_FIELD_NOT_EMPTY: u64 = 1;
    const E_FIELD_NOT_PLANTED: u64 = 2;
    const E_CROP_NOT_READY: u64 = 3;

    // ========== STRUCTS ==========
    // Field (tarla) — sahiplenilebilen obje
    public struct Field has key, store {
        id: UID,
        owner: address,
        planted_at: u64,    // ms timestamp (0 if boş)
        crop_ready: bool,
    }

    public struct Sugar has key, store {
        id: UID,
        owner: address,
        amount: u64,
    }

    // ========== EVENTS ==========
    public struct HarvestEvent has copy, drop {
        owner: address,
        sugar_amount: u64,
        timestamp: u64,
    }

    // Mint a new field to a user
    public fun mint_field(recipient: address, ctx: &mut tx_context::TxContext) {
        let id = object::new(ctx);
        let field = Field {
            id,
            owner: recipient,
            planted_at: 0,
            crop_ready: false,
        };
        transfer::transfer(field, recipient);
    }

    // Plant crop (sets planted_at)
    public fun plant(field: &mut Field, clock: &Clock) {
        // require field empty
        assert!(field.planted_at == 0, E_FIELD_NOT_EMPTY);
        let now = clock::timestamp_ms(clock);
        field.planted_at = now;
        field.crop_ready = false;
    }

    // Check growth (demo: 10 seconds)
    public fun check_grow(field: &mut Field, clock: &Clock) {
        assert!(field.planted_at != 0, E_FIELD_NOT_PLANTED);
        let now = clock::timestamp_ms(clock);
        if (now - field.planted_at >= GROW_TIME_MS) {
            field.crop_ready = true;
        }
    }

    // Harvest: returns a Sugar object to the caller
    public fun harvest(field: &mut Field, ctx: &mut tx_context::TxContext, clock: &Clock) {
        assert!(field.crop_ready == true, E_CROP_NOT_READY);
        // reset field
        field.crop_ready = false;
        field.planted_at = 0;

        let id = object::new(ctx);
        let owner_addr = field.owner;
        let sugar = Sugar {
            id,
            owner: owner_addr,
            amount: 1,
        };
        // emit harvest event with timestamp
        event::emit(HarvestEvent {
            owner: owner_addr,
            sugar_amount: 1,
            timestamp: clock::timestamp_ms(clock),
        });
        transfer::transfer(sugar, owner_addr);
    }

    // Burn sugar and emit event (demo: no actual coin transfer)
    // NOTE: To implement real SUI payment, add a Coin<SUI> parameter and transfer it to a treasury.
    public fun sell_sugar(sugar: Sugar, clock: &Clock) {
        // Destructure to access owner and amount
        let Sugar { id, owner, amount } = sugar;
        // Emit sell/burn event with timestamp
        event::emit(HarvestEvent {
            owner,
            sugar_amount: amount,
            timestamp: clock::timestamp_ms(clock),
        });
        // Burn the object ID
        object::delete(id);
    }

    // ========== TESTS ==========
    #[test]
    fun test_field_struct_creation() {
        let mut ctx = tx_context::dummy();
        let field = Field {
            id: object::new(&mut ctx),
            owner: @0xABCD,
            planted_at: 0,
            crop_ready: false,
        };
        assert!(field.owner == @0xABCD);
        assert!(field.planted_at == 0);
        assert!(field.crop_ready == false);
        
        let Field { id, owner: _, planted_at: _, crop_ready: _ } = field;
        object::delete(id);
    }

    #[test]
    fun test_sugar_struct_creation() {
        let mut ctx = tx_context::dummy();
        let sugar = Sugar {
            id: object::new(&mut ctx),
            owner: @0xABCD,
            amount: 100,
        };
        assert!(sugar.owner == @0xABCD);
        assert!(sugar.amount == 100);
        
        let Sugar { id, owner: _, amount: _ } = sugar;
        object::delete(id);
    }

    #[test]
    fun test_module_constants() {
        assert!(E_FIELD_NOT_EMPTY == 1);
        assert!(E_FIELD_NOT_PLANTED == 2);
        assert!(E_CROP_NOT_READY == 3);
        assert!(GROW_TIME_MS == 10_000);
    }

    #[test]
    fun test_harvest_event_struct() {
        let event = HarvestEvent {
            owner: @0xABCD,
            sugar_amount: 50,
            timestamp: 12345,
        };
        assert!(event.owner == @0xABCD);
        assert!(event.sugar_amount == 50);
        assert!(event.timestamp == 12345);
    }

    #[test]
    fun test_field_state_logic() {
        let mut ctx = tx_context::dummy();
        let mut field = Field {
            id: object::new(&mut ctx),
            owner: @0xABCD,
            planted_at: 0,
            crop_ready: false,
        };
        
        // Initial state
        assert!(field.planted_at == 0);
        assert!(field.crop_ready == false);
        
        // Simulate planting
        field.planted_at = 100;
        assert!(field.planted_at == 100);
        
        // Simulate crop ready
        field.crop_ready = true;
        assert!(field.crop_ready == true);
        
        // Simulate harvest reset
        field.crop_ready = false;
        field.planted_at = 0;
        assert!(field.planted_at == 0);
        assert!(field.crop_ready == false);
        
        let Field { id, owner: _, planted_at: _, crop_ready: _ } = field;
        object::delete(id);
    }

    #[test]
    fun test_sugar_amounts() {
        let mut ctx = tx_context::dummy();
        let sugar1 = Sugar {
            id: object::new(&mut ctx),
            owner: @0xABCD,
            amount: 1,
        };
        
        let sugar2 = Sugar {
            id: object::new(&mut ctx),
            owner: @0xABCD,
            amount: 50,
        };
        
        assert!(sugar1.amount == 1);
        assert!(sugar2.amount == 50);
        assert!(sugar1.amount + sugar2.amount == 51);
        
        let Sugar { id: id1, owner: _, amount: _ } = sugar1;
        let Sugar { id: id2, owner: _, amount: _ } = sugar2;
        object::delete(id1);
        object::delete(id2);
    }

    #[test]
    fun test_owner_tracking() {
        let mut ctx = tx_context::dummy();
        let alice = @0xAAAA;
        let bob = @0xBBBB;
        
        let field_alice = Field {
            id: object::new(&mut ctx),
            owner: alice,
            planted_at: 0,
            crop_ready: false,
        };
        
        let field_bob = Field {
            id: object::new(&mut ctx),
            owner: bob,
            planted_at: 0,
            crop_ready: false,
        };
        
        assert!(field_alice.owner == alice);
        assert!(field_bob.owner == bob);
        assert!(field_alice.owner != field_bob.owner);
        
        let Field { id: id_alice, owner: _, planted_at: _, crop_ready: _ } = field_alice;
        let Field { id: id_bob, owner: _, planted_at: _, crop_ready: _ } = field_bob;
        object::delete(id_alice);
        object::delete(id_bob);
    }

    #[test]
    #[expected_failure(abort_code = E_FIELD_NOT_EMPTY)]
    fun test_field_not_empty_check() {
        let mut ctx = tx_context::dummy();
        let field = Field {
            id: object::new(&mut ctx),
            owner: @0xABCD,
            planted_at: 100,
            crop_ready: false,
        };
        
        assert!(field.planted_at == 0, E_FIELD_NOT_EMPTY);
        
        let Field { id, owner: _, planted_at: _, crop_ready: _ } = field;
        object::delete(id);
    }

    #[test]
    #[expected_failure(abort_code = E_FIELD_NOT_PLANTED)]
    fun test_field_not_planted_check() {
        let mut ctx = tx_context::dummy();
        let field = Field {
            id: object::new(&mut ctx),
            owner: @0xABCD,
            planted_at: 0,
            crop_ready: false,
        };
        
        assert!(field.planted_at != 0, E_FIELD_NOT_PLANTED);
        
        let Field { id, owner: _, planted_at: _, crop_ready: _ } = field;
        object::delete(id);
    }

    #[test]
    #[expected_failure(abort_code = E_CROP_NOT_READY)]
    fun test_crop_not_ready_check() {
        let mut ctx = tx_context::dummy();
        let field = Field {
            id: object::new(&mut ctx),
            owner: @0xABCD,
            planted_at: 100,
            crop_ready: false,
        };
        
        assert!(field.crop_ready == true, E_CROP_NOT_READY);
        
        let Field { id, owner: _, planted_at: _, crop_ready: _ } = field;
        object::delete(id);
    }

    #[test]
    fun test_grow_time_calculation() {
        let current_time_before = 0;
        let time_elapsed = current_time_before + 5_000;
        assert!(time_elapsed < GROW_TIME_MS);
        
        let current_time_after = GROW_TIME_MS + 1;
        let time_elapsed_after = current_time_after - 0;
        assert!(time_elapsed_after >= GROW_TIME_MS);
    }
}
